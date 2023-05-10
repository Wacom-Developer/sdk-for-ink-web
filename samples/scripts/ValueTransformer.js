/**
 *
 * ValueTransformer provides a set of static methods for transforming numerical values in different ways.
 * Each method takes a numeric value as input, applies a specific transformation to it, and returns the transformed value.
 *
 * These transformations include:
 * Power transformation: Raises the input value to a specified power.
 * Periodic transformation: Maps the input value to a periodic curve (a cosine wave) that oscillates between 0 and 1.
 * Sigmoid transformation: Maps the input value to a sigmoid curve (an S-shaped curve) that is bounded between specified minimum and maximum values.
 * The reverse parameter in each transformation method allows for reversing the transformation by passing in true as the third argument. The reverse method simply returns the inverse of the input value (i.e., 1 - v).
 */

export default class ValueTransformer {

	/**
	 *
	 * @param value {number}
	 * @param exponent {number}
	 * @param reverse {boolean}
	 * @returns {number}
	 */
	static power(value, exponent, reverse = false) {
		if (reverse) value = this.reverse(value);
		return value ** exponent;
	}

	/**
	 *
	 * @param value {number}
	 * @param frequency {number}
	 * @param reverse {boolean}
	 * @returns {number}
	 */
	static periodic(value, frequency, reverse = false) {
		if (reverse) value = this.reverse(value);
		return 0.5 - 0.5 * Math.cos(frequency * Math.PI * value);
	}

	/**
	 *
	 * @param value {number}
	 * @param curveSteepness {number}
	 * @param reverse {boolean}
	 * @param minValue {number}
	 * @param maxValue {number}
	 * @returns {number}
	 */
	static sigmoid(value, curveSteepness, reverse, minValue = 0, maxValue = 1) {
		if (reverse) value = this.reverse(value);

		/**
		 *
		 * @param input {number}
		 * @param steepness {number}
		 * @returns {number}
		 */
		const sigmoid = (input, steepness) => (1 + steepness) * input / (Math.abs(input) + steepness);

		const middle = (maxValue + minValue) * 0.5;
		const halfInterval = (maxValue - minValue) * 0.5;
		const average = (value - middle) / halfInterval;
		const sigmoidOutput = sigmoid(average, curveSteepness);

		return middle + sigmoidOutput * halfInterval;
	}

	/**
	 *
	 * @param value {number}
	 * @returns {number}
	 */
	static reverse(value) {
		return 1 - value;
	}
}