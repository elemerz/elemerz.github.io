package ezcompress.entropy;

import java.util.Arrays;
import ezcompress.Predictor;

public class CMPredictor implements Predictor {
	private static final int FAST_RATE = 2;
	private static final int MEDIUM_RATE = 4;
	private static final int SLOW_RATE = 6;
	private static final int PSCALE = 65536;

	private int c1;
	private int c2;
	private int ctx;
	private int idx;
	private int runMask;
	private final int[][] counter1;
	private final int[][] counter2;

	public CMPredictor() {
		this.ctx = 1;
		this.idx = 0;
		this.counter1 = new int[256][257];
		this.counter2 = new int[512][17];

		for (int i = 0; i < 256; i++) {
			Arrays.fill(this.counter1[i], PSCALE >> 1);

			for (int j = 0; j < 16; j++) {
				this.counter2[i + i][j] = j << 12;
				this.counter2[i + i + 1][j] = j << 12;
			}

			this.counter2[i + i][16] = 15 << 12;
			this.counter2[i + i + 1][16] = 15 << 12;
		}
	}

	// Update the probability model
	@Override
	public void update(int bit) {
		final int[] counter1_ = this.counter1[this.ctx];
		final int[] counter2_ = this.counter2[this.ctx | this.runMask];
		this.ctx <<= 1;

		if (bit == 0) {
			counter1_[256] -= (counter1_[256] >> FAST_RATE);
			counter1_[this.c1] -= (counter1_[this.c1] >> MEDIUM_RATE);
			counter2_[this.idx] -= (counter2_[this.idx] >> SLOW_RATE);
			counter2_[this.idx + 1] -= (counter2_[this.idx + 1] >> SLOW_RATE);
		} else {
			counter1_[256] -= ((counter1_[256] - PSCALE + 16) >> FAST_RATE);
			counter1_[this.c1] -= ((counter1_[this.c1] - PSCALE + 16) >> MEDIUM_RATE);
			counter2_[this.idx] -= ((counter2_[this.idx] - PSCALE + 16) >> SLOW_RATE);
			counter2_[this.idx + 1] -= ((counter2_[this.idx + 1] - PSCALE + 16) >> SLOW_RATE);
			this.ctx++;
		}

		if (this.ctx > 255) {
			this.c2 = this.c1;
			this.c1 = this.ctx & 0xFF;
			this.ctx = 1;
			this.runMask = (this.c1 == this.c2) ? 0x100 : 0;
		}
	}

	// Return the split value representing the probability of 1 in the [0..4095]
	// range.
	@Override
	public int get() {
		final int[] pc1 = this.counter1[this.ctx];
		final int p = (13 * (pc1[256] + pc1[this.c1]) + 6 * pc1[this.c2]) >> 5;
		this.idx = p >>> 12;
		final int[] pc2 = this.counter2[this.ctx | this.runMask];
		final int x1 = pc2[this.idx];
		final int x2 = pc2[this.idx + 1];
		final int ssep = x1 + (((x2 - x1) * (p & 4095)) >> 12);
		return (p + 3 * ssep + 32) >>> 6; // rescale to [0..4095]
	}
}
