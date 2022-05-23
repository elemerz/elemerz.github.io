package ezcompress.transform;

import java.util.Map;
import ezcompress.ByteTransform;
import ezcompress.SliceByteArray;

public class NullTransform implements ByteTransform {
	public NullTransform() {
	}

	public NullTransform(Map<String, Object> ctx) {
	}

	@Override
	public boolean forward(SliceByteArray input, SliceByteArray output) {
		return doCopy(input, output);
	}

	@Override
	public boolean inverse(SliceByteArray input, SliceByteArray output) {
		return doCopy(input, output);
	}

	private static boolean doCopy(SliceByteArray input, SliceByteArray output) {
		if (input.length == 0)
			return true;

		final int count = input.length;

		if (output.length - output.index < count)
			return false;

		if ((input.array != output.array) || (input.index != output.index))
			System.arraycopy(input.array, input.index, output.array, output.index, count);

		input.index += count;
		output.index += count;
		return true;
	}

	@Override
	public int getMaxEncodedLength(int srcLen) {
		return srcLen;
	}
}