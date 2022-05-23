package ezcompress;

public interface EntropyEncoder {
    // Encode the array provided into the bitstream. Return the number of bytes
    // written to the bitstream
    public int encode(byte[] array, int blkptr, int len);

    // Return the underlying bitstream
    public OutputBitStream getBitStream();

    // Must be called before getting rid of the entropy coder
    // Trying to encode after a call to dispose gives undefined behavior
    public void dispose();
}
