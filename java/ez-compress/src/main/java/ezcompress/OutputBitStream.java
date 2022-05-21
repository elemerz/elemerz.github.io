package ezcompress;

public interface OutputBitStream {
   // Write the least significant bit of the input integer
   // Throws if the stream is closed.
   public void writeBit(int bit) throws BitStreamException;

   // Length is the number of bits in [1..64]. Return the number of bits written.
   // Throws if the stream is closed.
   public int writeBits(long bits, int length) throws BitStreamException;

   // Write bits ouf of the byte array at index 'start'.
   // Length is the number of bits.
   // Return the number of bits written.
   // Throws if the stream is closed.
   public int writeBits(byte[] bits, int start, int nbBits) throws BitStreamException;

   public void close() throws BitStreamException;

   // Number of bits written
   public long written();
}