package ezcompress.entropy;

import ezcompress.EntropyEncoder;
import ezcompress.OutputBitStream;

// Null entropy encoder and decoder
// Pass through that writes the data directly to the bitstream
public final class NullEntropyEncoder implements EntropyEncoder {
	private final OutputBitStream bitstream;

	public NullEntropyEncoder(OutputBitStream bitstream) {
		if (bitstream == null)
			throw new NullPointerException("Invalid null bitstream parameter");

		this.bitstream = bitstream;
	}

	@Override
	public int encode(byte[] block, int blkptr, int count) {
		if ((block == null) || (blkptr + count > block.length) || (blkptr < 0) || (count < 0))
			return -1;

		int res = 0;

		while (count > 0) {
			final int ckSize = (count < 1 << 23) ? count : 1 << 23;
			res += (this.bitstream.writeBits(block, blkptr, 8 * ckSize) >> 3);
			blkptr += ckSize;
			count -= ckSize;
		}

		return res;
	}

	public void encodeByte(byte val) {
		this.bitstream.writeBits(val, 8);
	}

	@Override
	public OutputBitStream getBitStream() {
		return this.bitstream;
	}

	@Override
	public void dispose() {
	}
}
