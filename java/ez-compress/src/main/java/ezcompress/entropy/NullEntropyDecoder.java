package ezcompress.entropy;

import ezcompress.EntropyDecoder;
import ezcompress.InputBitStream;

// Null entropy encoder and decoder
// Pass through that writes the data directly to the bitstream
public final class NullEntropyDecoder implements EntropyDecoder {
	private final InputBitStream bitstream;

	public NullEntropyDecoder(InputBitStream bitstream) {
		if (bitstream == null)
			throw new NullPointerException("Invalid null bitstream parameter");

		this.bitstream = bitstream;
	}

	@Override
	public int decode(byte[] block, int blkptr, int count) {
		if ((block == null) || (blkptr + count > block.length) || (blkptr < 0) || (count < 0))
			return -1;

		int res = 0;

		while (count > 0) {
			final int ckSize = (count < 1 << 23) ? count : 1 << 23;
			res += (this.bitstream.readBits(block, blkptr, 8 * ckSize) >> 3);
			blkptr += ckSize;
			count -= ckSize;
		}

		return res;
	}

	public byte decodeByte() {
		return (byte) this.bitstream.readBits(8);
	}

	@Override
	public InputBitStream getBitStream() {
		return this.bitstream;
	}

	@Override
	public void dispose() {
	}
}
