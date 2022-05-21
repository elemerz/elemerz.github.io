package ezcompress.transform;

import java.util.Map;
import ezcompress.ByteTransform;
import ezcompress.Global;
import ezcompress.Magic;
import ezcompress.SliceByteArray;

// Fixed Step Delta codec
// Decorrelate values separated by a constant distance (step) and encode residuals
public class FSDCodec implements ByteTransform
{
   private static final int MIN_LENGTH = 128;
   private static final byte ESCAPE_TOKEN = (byte) 255;
   private static final byte DELTA_CODING = (byte) 0;
   private static final byte XOR_CODING = (byte) 1;

   private Map<String, Object> ctx;


   public FSDCodec()
   {
   }


   public FSDCodec(Map<String, Object> ctx)
   {
      this.ctx = ctx;
   }


   @Override
   public boolean forward(SliceByteArray input, SliceByteArray output)
   {
      if (input.length == 0)
         return true;

      if (input.array == output.array)
         return false;

      final int count = input.length;

      if (output.length - output.index < this.getMaxEncodedLength(count))
         return false;

      // If too small, skip
      if (count < MIN_LENGTH)
          return false;

      if (this.ctx != null)
      {
         Global.DataType dt = (Global.DataType) this.ctx.getOrDefault("dataType",
            Global.DataType.UNDEFINED);

         if ((dt != Global.DataType.UNDEFINED) && (dt != Global.DataType.MULTIMEDIA) &&
             (dt != Global.DataType.BIN))
            return false;
      }

      final int count5 = count / 5;
      final int count10 = count / 10;
      final int[][] histo = new int[6][256];
      final int magic = Magic.getType(input.array, input.index);
      
      // Skip detection except for a few candidate types
      switch (magic) 
      {
         case Magic.BMP_MAGIC:
         case Magic.RIFF_MAGIC:
         case Magic.PBM_MAGIC:
         case Magic.PGM_MAGIC:
         case Magic.PPM_MAGIC:
         case Magic.NO_MAGIC:
            break;
         default:
            return false;
      }
      
      final byte[] src = input.array;
      final byte[] dst = output.array;
      final int start1 = input.index + 3*count5;
      final int end1 = input.index + (3*count5) + count10;
      
      // Check several step values on a sub-block (no memory allocation)
      // Sample 2 sub-blocks
      for (int i=start1; i<end1; i++)
      {
         final byte b = src[i];
         histo[0][b&0xFF]++;
         histo[1][(b^src[i-1])&0xFF]++;
         histo[2][(b^src[i-2])&0xFF]++;
         histo[3][(b^src[i-3])&0xFF]++;
         histo[4][(b^src[i-4])&0xFF]++;
         histo[5][(b^src[i-8])&0xFF]++;
      }

      final int start2 = input.index + 1*count5 + count10;
      final int end2 = input.index + 2*count5;

      for (int i=start2; i<end2; i++)
      {
         final byte b = src[i];
         histo[0][b&0xFF]++;
         histo[1][(b^src[i-1])&0xFF]++;
         histo[2][(b^src[i-2])&0xFF]++;
         histo[3][(b^src[i-3])&0xFF]++;
         histo[4][(b^src[i-4])&0xFF]++;
         histo[5][(b^src[i-8])&0xFF]++;
      }

      // Find if entropy is lower post transform
      int[] ent = new int[6];
      ent[0] = Global.computeFirstOrderEntropy1024(count5, histo[0]);
      int minIdx = 0;

      for (int i=1; i<ent.length; i++)
      {
         ent[i] = Global.computeFirstOrderEntropy1024(count5, histo[i]);

         if (ent[i] < ent[minIdx])
            minIdx = i;
      }

      if (this.ctx != null)
         this.ctx.put("dataType", Global.detectSimpleType(count5, histo[0]));

      // If not better, quick exit
      if (ent[minIdx] >= ent[0])
         return false;

      if (this.ctx != null)
         this.ctx.put("dataType", Global.DataType.MULTIMEDIA);

      final int dist = (minIdx <= 4) ? minIdx : 8;
      int largeDeltas = 0;

      // Detect best coding by sampling for large deltas
      for (int i=2*count5; i<3*count5; i++)
      {
         final int delta = (src[i]&0xFF) - (src[i-dist]&0xFF);

         if ((delta < -127) || (delta > 127))
            largeDeltas++;
      }

      // Delta coding works better for pictures & xor coding better for wav files
      // Select xor coding if large deltas are over 3% (ad-hoc threshold)
      final byte mode = (largeDeltas > (count5>>5)) ? XOR_CODING : DELTA_CODING;
      int srcIdx = input.index;
      int dstIdx = output.index;
      dst[dstIdx] = mode;
      dst[dstIdx+1] = (byte) dist;
      dstIdx += 2;
      final int srcEnd = srcIdx + count;
      final int dstEnd = dstIdx + this.getMaxEncodedLength(count);

      // Emit first bytes
      for (int i=0; i<dist; i++)
         dst[dstIdx++] = src[srcIdx++];

      // Emit modified bytes
      if (mode == DELTA_CODING)
      {
         while ((srcIdx < srcEnd) && (dstIdx < dstEnd))
         {
            final int delta = (src[srcIdx]&0xFF) - (src[srcIdx-dist]&0xFF);

            if ((delta < -127) || (delta > 127))
            {
               if (dstIdx == dstEnd-1)
                  break;

               // Skip delta, encode with escape
               dst[dstIdx++] = ESCAPE_TOKEN;
               dst[dstIdx++] = (byte) (src[srcIdx] ^ src[srcIdx-dist]);
               srcIdx++;
               continue;
            }

            dst[dstIdx++] = (byte) ((delta>>31) ^ (delta<<1)); // zigzag encode delta
            srcIdx++;
         }
      }
      else // mode == XOR_CODING
      {
         while (srcIdx < srcEnd)
         {
            dst[dstIdx++] = (byte) (src[srcIdx] ^ src[srcIdx-dist]);
            srcIdx++;
         }
      }

      if (srcIdx != srcEnd)
         return false;

      // Extra check that the transform makes sense
      boolean isFast = (this.ctx == null) ? true : (this.ctx.getOrDefault("fullFSD", false) == Boolean.FALSE);
      final int length = (isFast == true) ? dstIdx>>1 : dstIdx;
      Global.computeHistogramOrder0(dst, (dstIdx-length)>>1, (dstIdx+length)>>1, histo[0], false);
      final int entropy = Global.computeFirstOrderEntropy1024(length, histo[0]);

      if (entropy >= ent[0])
         return false;

      input.index = srcIdx;
      output.index = dstIdx;
      return true; // Allowed to expand
   }


   @Override
   public boolean inverse(SliceByteArray input, SliceByteArray output)
   {
      if (input.length == 0)
         return true;

      if (input.array == output.array)
         return false;

      final int count = input.length;
      final byte[] src = input.array;
      final byte[] dst = output.array;
      int srcIdx = input.index;
      int dstIdx = output.index;
      final int srcEnd = srcIdx + count;
      final int dstEnd = output.length;

      // Retrieve mode & step value
      final byte mode = src[srcIdx];
      final int dist = src[srcIdx+1] & 0xFF;
      srcIdx += 2;

      // Sanity check
      if ((dist < 1) || ((dist > 4) && (dist != 8)))
         return false;

      // Copy first bytes
      for (int i=0; i<dist; i++)
         dst[dstIdx++] = src[srcIdx++];

      // Recover original bytes
      if (mode == DELTA_CODING)
      {
         while ((srcIdx < srcEnd) && (dstIdx < dstEnd))
         {
            if (src[srcIdx] == ESCAPE_TOKEN)
            {
               srcIdx++;

               if (srcIdx == srcEnd)
                  break;

               dst[dstIdx] = (byte) (src[srcIdx] ^ dst[dstIdx-dist]);
               srcIdx++;
               dstIdx++;
               continue;
            }

            final int delta = ((src[srcIdx]&0xFF)>>1) ^ -(src[srcIdx]&1); // zigzag decode delta
            dst[dstIdx] = (byte) ((dst[dstIdx-dist]&0xFF) + delta);
            srcIdx++;
            dstIdx++;
         }
      }
      else // mode == XOR_CODING
      {
        while (srcIdx < srcEnd)
        {
            dst[dstIdx] = (byte) (src[srcIdx] ^ dst[dstIdx-dist]);
            srcIdx++;
            dstIdx++;
         }
      }

      input.index = srcIdx;
      output.index = dstIdx;
      return srcIdx == srcEnd;
   }


   @Override
   public int getMaxEncodedLength(int srcLength)
   {
      return srcLength + Math.max(64, (srcLength>>4)); // limit expansion
   }
}
