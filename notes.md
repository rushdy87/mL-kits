<h2>Goal</h2>
<p>Given some data about where a ball is dropped from, can we predict what bucket it will end up in?</p>
<h2>Tensor</h2>
<p>Javascript object wrapes a collections of numbers, and those numbers some type of structures of arrays </p>
<p>In mathematics and machine learning, a tensor is a mathematical object that is a generalization of scalars, vectors, and matrices. Tensors can have different numbers of dimensions, and they are used to represent data in machine learning models, especially deep learning models. In TensorFlow, tensors are the fundamental data structures used to store and manipulate data. Tensors can be thought of as multidimensional arrays.</p>
<h2>Shape</h2>
<p>
In the context of machine learning and TensorFlow, "shape" refers to the dimensions or size of a tensor. Tensors are multi-dimensional arrays that can represent various types of data, such as scalars, vectors, matrices, or higher-dimensional data. The shape of a tensor tells you how many elements it contains along each of its dimensions.</p>
<h2>Element-wise operation</h2>
<p>
An element-wise operation, also known as element-wise computation or element-wise transformation, is a mathematical operation performed independently on each element of a data structure, such as a vector, matrix, or tensor. In the context of machine learning and numerical computing, element-wise operations are commonly used when working with arrays or tensors to apply a specific operation or function to every individual element of the data structure.
</p>
<code>
const features = tf.tensor([
	[-121, 47], //[lat, long]
  [-121.2, 46.5],
  [-122, 46.4],
  [-120.9, 46.7]
]);

const labels = tf.tensor([
[200],
[250],
[215],
[240]
]);

const productionPoint = tf.tensor([-121, 47]);

const k = 2;

features
.sub(productionPoint)
.pow(2) //power
.sum(1)
.pow(0.5)
.expandDims(1) //Inserts a dimension of 1 into a tensor's shape.
.concat(labels, 1)
.unstack() //convert the tensor normal js array of tensors
//From her we will deal with a normal javascript array
.sort((a, b) => a.get(0) > b.get(0) ? 1 : -1)
.slice(0, k)
.reduce((acc, pair) => acc + pair.get(1), 0) / k
</code>
