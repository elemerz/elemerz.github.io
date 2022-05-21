package ezcompress;

public class BitStreamException extends RuntimeException
{
    private static final long serialVersionUID = 7279737120722476336L;

    public static final int UNDEFINED = 0;
    public static final int INPUT_OUTPUT   = 1;
    public static final int END_OF_STREAM  = 2;
    public static final int INVALID_STREAM = 3;
    public static final int STREAM_CLOSED  = 4;

    private final int code;


    protected BitStreamException()
    {
        this.code = UNDEFINED;
    }


    public BitStreamException(String message, int code)
    {
        super(message);
        this.code = code;
    }


    public BitStreamException(String message, Throwable cause, int code)
    {
        super(message, cause);
        this.code = code;
    }


    public BitStreamException(Throwable cause, int code)
    {
        super(cause);
        this.code = code;
    }


    public int getErrorCode()
    {
        return this.code;
    }
}
