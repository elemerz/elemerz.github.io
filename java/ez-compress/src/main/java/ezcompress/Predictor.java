package ezcompress;

//Interface used by the binary entropy coder to predict probabilities of 0 and 1
//symbols in the input signal
public interface Predictor {
	// Update the probability model
	public void update(int bit);

	// Return the split value representing the probability of 1 in the [0..4095]
	// range.
	// E.G. 410 represents roughly a probability of 10% for 1
	public int get();
}
