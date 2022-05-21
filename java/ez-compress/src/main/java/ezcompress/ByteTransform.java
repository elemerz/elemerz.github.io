package ezcompress;

public interface ByteTransform {
   // Read src.length bytes from src.array[src.index], process them and
   // write them to dst.array[dst.index]. The index of each slice is updated
   // with the number of bytes respectively read from and written to.
   public boolean forward(SliceByteArray src, SliceByteArray dst);


   // Read src.length bytes from src.array[src.index], process them and
   // write them to dst.array[dst.index]. The index of each slice is updated
   // with the number of bytes respectively read from and written to.
   public boolean inverse(SliceByteArray src, SliceByteArray dst);


   // Return the max size required for the output buffer
   public int getMaxEncodedLength(int srcLength);
}
