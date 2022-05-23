package ezcompress.io;

public class IOException extends java.io.IOException {
	private static final long serialVersionUID = -9153775235137373283L;

	private final int code;

	public IOException(String msg, int code) {
		super(msg);
		this.code = code;
	}

	public int getErrorCode() {
		return this.code;
	}
}
