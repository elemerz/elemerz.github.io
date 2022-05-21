package ezcompress.entropy;

import ezcompress.EntropyDecoder;
import ezcompress.InputBitStream;

// Exponential Golomb Coder
public final class ExpGolombDecoder implements EntropyDecoder {
	private final boolean signed;
	private final InputBitStream bitstream;

	public ExpGolombDecoder(InputBitStream bitstream, boolean signed) {
		if (bitstream == null)
			throw new NullPointerException("ExpGolomb codec: Invalid null bitstream parameter");

		this.signed = signed;
		this.bitstream = bitstream;
	}

	public boolean isSigned() {
		return this.signed;
	}

	public byte decodeByte() {
		if (this.bitstream.readBit() == 1)
			return 0;

		int log2 = 1;

		while (this.bitstream.readBit() == 0)
			log2++;

		if (this.signed == true) {
			// Decode signed: read value + sign
			long res = this.bitstream.readBits(log2 + 1);
			final long sgn = res & 1;
			res = (res >>> 1) + (1 << log2) - 1;
			return (byte) ((res - sgn) ^ -sgn); // res or -res
		}

		// Decode unsigned
		return (byte) ((1 << log2) - 1 + this.bitstream.readBits(log2));
	}

	@Override
	public InputBitStream getBitStream() {
		return this.bitstream;
	}

	@Override
	public int decode(byte[] block, int blkptr, int count) {
		if ((block == null) || (blkptr + count > block.length) || (blkptr < 0) || (count < 0))
			return -1;

		final int end = blkptr + count;

		for (int i = blkptr; i < end; i++)
			block[i] = this.decodeByte();

		return count;
	}

	@Override
	public void dispose() {
	}
}
