package ezcompress;

public interface InputBitStream {
   // Return 1 or 0
   public int readBit() throws BitStreamException;

   // Length is the number of bits in [1..64]. Return the bits read as a long
   // Throws if the stream is closed.
   public long readBits(int length) throws BitStreamException;

   // Read bits and put them in the byte array at index 'start'.
   // Length is the number of bits
   // Return the number of bits read.
   // Throws if the stream is closed.
   public int readBits(byte[] bits, int start, int length) throws BitStreamException;

   public void close() throws BitStreamException;

   // Number of bits read
   public long read();

   // Return false when the bitstream is closed or the End-Of-Stream has been reached
   public boolean hasMoreToRead();
}
