package ezcompress;

public final class Error {
	public static final int ERR_MISSING_PARAM = 1;
	public static final int ERR_BLOCK_SIZE = 2;
	public static final int ERR_INVALID_CODEC = 3;
	public static final int ERR_CREATE_COMPRESSOR = 4;
	public static final int ERR_CREATE_DECOMPRESSOR = 5;
	public static final int ERR_OUTPUT_IS_DIR = 6;
	public static final int ERR_OVERWRITE_FILE = 7;
	public static final int ERR_CREATE_FILE = 8;
	public static final int ERR_CREATE_BITSTREAM = 9;
	public static final int ERR_OPEN_FILE = 10;
	public static final int ERR_READ_FILE = 11;
	public static final int ERR_WRITE_FILE = 12;
	public static final int ERR_PROCESS_BLOCK = 13;
	public static final int ERR_CREATE_CODEC = 14;
	public static final int ERR_INVALID_FILE = 15;
	public static final int ERR_STREAM_VERSION = 16;
	public static final int ERR_CREATE_STREAM = 17;
	public static final int ERR_INVALID_PARAM = 18;
	public static final int ERR_CRC_CHECK = 19;
	public static final int ERR_UNKNOWN = 127;

	private Error() {
	}
}
