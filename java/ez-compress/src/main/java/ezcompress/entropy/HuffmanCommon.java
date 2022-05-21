package ezcompress.entropy;

public final class HuffmanCommon {
	public static final int LOG_MAX_CHUNK_SIZE = 14;
	public static final int MAX_CHUNK_SIZE = 1 << LOG_MAX_CHUNK_SIZE;
	public static final int MAX_SYMBOL_SIZE = LOG_MAX_CHUNK_SIZE;
	private static final int BUFFER_SIZE = (MAX_SYMBOL_SIZE << 8) + 256;

	// Return the number of codes generated
	public static int generateCanonicalCodes(short[] sizes, int[] codes, int[] symbols, int count) {
		// Sort symbols by increasing size (first key) and increasing value (second key)
		if (count > 1) {
			byte[] buf = new byte[BUFFER_SIZE];

			for (int i = 0; i < count; i++) {
				final int s = symbols[i];

				if (((s & 0xFF) != s) || (sizes[s] > MAX_SYMBOL_SIZE))
					return -1;

				buf[((sizes[s] - 1) << 8) | s] = 1;
			}

			int n = 0;

			for (int i = 0; i < BUFFER_SIZE; i++) {
				if (buf[i] == 0)
					continue;

				symbols[n++] = i & 0xFF;

				if (n == count)
					break;
			}
		}

		int code = 0;
		int curLen = sizes[symbols[0]];

		for (int i = 0; i < count; i++) {
			final int s = symbols[i];

			if (sizes[s] > curLen) {
				code <<= (sizes[s] - curLen);
				curLen = sizes[s];
			}

			codes[s] = code;
			code++;
		}

		return count;
	}
}