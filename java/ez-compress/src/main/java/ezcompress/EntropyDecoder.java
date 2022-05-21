package ezcompress;

public interface EntropyDecoder {
    // Decode the next chunk of data from the bitstream and return in the
    // provided buffer.
    public int decode(byte[] buffer, int blkptr, int len);

    // Must be called before getting rid of the entropy coder
    public void dispose();

    // Return the underlying bitstream
    public InputBitStream getBitStream();
}

