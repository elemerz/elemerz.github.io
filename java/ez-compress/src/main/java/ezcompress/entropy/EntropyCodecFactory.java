package ezcompress.entropy;

import java.util.Map;
import ezcompress.EntropyDecoder;
import ezcompress.EntropyEncoder;
import ezcompress.InputBitStream;
import ezcompress.OutputBitStream;

public class EntropyCodecFactory {
	public static final byte NONE_TYPE = 0; // No compression
	public static final byte HUFFMAN_TYPE = 1; // Huffman
	public static final byte FPAQ_TYPE = 2; // Fast PAQ (order 0)
	public static final byte PAQ_TYPE = 3; // Obsolete
	public static final byte RANGE_TYPE = 4; // Range
	public static final byte ANS0_TYPE = 5; // Asymmetric Numerical System order 0
	public static final byte CM_TYPE = 6; // Context Model
	public static final byte TPAQ_TYPE = 7; // Tangelo PAQ
	public static final byte ANS1_TYPE = 8; // Asymmetric Numerical System order 1
	public static final byte TPAQX_TYPE = 9; // Tangelo PAQ Extra
	public static final byte RESERVED1 = 10; // Reserved
	public static final byte RESERVED2 = 11; // Reserved
	public static final byte RESERVED3 = 12; // Reserved
	public static final byte RESERVED4 = 13; // Reserved
	public static final byte RESERVED5 = 14; // Reserved
	public static final byte RESERVED6 = 15; // Reserved

	public EntropyDecoder newDecoder(InputBitStream ibs, Map<String, Object> ctx, int entropyType) {
		if (ibs == null)
			throw new NullPointerException("Invalid null input bitstream parameter");

		switch (entropyType) {
		// Each block is decoded separately
		// Rebuild the entropy decoder to reset block statistics
		case HUFFMAN_TYPE:
			return new HuffmanDecoder(ibs);

		case ANS0_TYPE:
			return new ANSRangeDecoder(ibs, 0, ctx);

		case ANS1_TYPE:
			return new ANSRangeDecoder(ibs, 1, ctx);

		case RANGE_TYPE:
			return new RangeDecoder(ibs);

		case FPAQ_TYPE:
			return new FPAQDecoder(ibs);

		case CM_TYPE:
			return new BinaryEntropyDecoder(ibs, new CMPredictor());

		case TPAQ_TYPE:
			return new BinaryEntropyDecoder(ibs, new TPAQPredictor(ctx));

		case TPAQX_TYPE:
			return new BinaryEntropyDecoder(ibs, new TPAQPredictor(ctx));

		case NONE_TYPE:
			return new NullEntropyDecoder(ibs);

		default:
			throw new IllegalArgumentException("Unsupported entropy codec type: " + (char) entropyType);
		}
	}

	public EntropyEncoder newEncoder(OutputBitStream obs, Map<String, Object> ctx, int entropyType) {
		if (obs == null)
			throw new NullPointerException("Invalid null output bitstream parameter");

		switch (entropyType) {
		case HUFFMAN_TYPE:
			return new HuffmanEncoder(obs);

		case ANS0_TYPE:
			return new ANSRangeEncoder(obs, 0, ctx);

		case ANS1_TYPE:
			return new ANSRangeEncoder(obs, 1, ctx);

		case RANGE_TYPE:
			return new RangeEncoder(obs);

		case FPAQ_TYPE:
			return new FPAQEncoder(obs);

		case CM_TYPE:
			return new BinaryEntropyEncoder(obs, new CMPredictor());

		case TPAQ_TYPE:
			return new BinaryEntropyEncoder(obs, new TPAQPredictor(ctx));

		case TPAQX_TYPE:
			return new BinaryEntropyEncoder(obs, new TPAQPredictor(ctx));

		case NONE_TYPE:
			return new NullEntropyEncoder(obs);

		default:
			throw new IllegalArgumentException("Unknown entropy codec type: '" + (char) entropyType + "'");
		}
	}

	public static String getName(int entropyType) {
		switch (entropyType) {
		case HUFFMAN_TYPE:
			return "HUFFMAN";

		case ANS0_TYPE:
			return "ANS0";

		case ANS1_TYPE:
			return "ANS1";

		case RANGE_TYPE:
			return "RANGE";

		case FPAQ_TYPE:
			return "FPAQ";

		case CM_TYPE:
			return "CM";

		case TPAQ_TYPE:
			return "TPAQ";

		case TPAQX_TYPE:
			return "TPAQX";

		case NONE_TYPE:
			return "NONE";

		default:
			throw new IllegalArgumentException("Unknown entropy codec type: '" + (char) entropyType + "''");
		}
	}

	public static int getType(String name) {
		// Strings in switch not supported in JDK 6
		name = String.valueOf(name).toUpperCase();

		switch (name) {
		case "HUFFMAN":
			return HUFFMAN_TYPE;

		case "ANS0":
			return ANS0_TYPE;

		case "ANS1":
			return ANS1_TYPE;

		case "FPAQ":
			return FPAQ_TYPE;

		case "RANGE":
			return RANGE_TYPE;

		case "CM":
			return CM_TYPE;

		case "NONE":
			return NONE_TYPE;

		case "TPAQ":
			return TPAQ_TYPE;

		case "TPAQX":
			return TPAQX_TYPE;

		default:
			throw new IllegalArgumentException("Unsupported entropy codec type: '" + name + "'");
		}
	}

}