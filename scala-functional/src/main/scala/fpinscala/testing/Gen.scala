package fpinscala.testing

import fpinscala.state.Reducer
import fpinscala.state.RNG

case class Gen[A](sample: Reducer[RNG, A]) {
  def listOfN(size: Int): Gen[List[A]] =
    Gen.listOfN(size, this)

  // 연습문제 8.6
  def flatMap[B](f: A => Gen[B]): Gen[B] =
    Gen(sample.flatMap(a => f(a).sample))

  def listOfN(size: Gen[Int]): Gen[List[A]] = 
    size flatMap (n => this.listOfN(n))

  def unsized: SGen[A] =
    Gen.Unsized(this)
}

object Gen {
  // 연습문제 8.4
  def choose(start: Int, stopExclusive: Int): Gen[Int] =
    Gen(Reducer(RNG.nonNegativeInt).map(n => start + n % (stopExclusive - start)))

  val double: Gen[Double] = 
    Gen(Reducer(RNG.double))

  // 놀이
  def chooseList(size: Int)(start: Int, stopExclusive: Int): Gen[List[Int]] = 
    Gen.listOfN(size, Gen.choose(start, stopExclusive))

  // 연습문제 8.5
  def unit[A](a: => A): Gen[A] =
    Gen(Reducer.unit(a))

  val boolean: Gen[Boolean] =
    Gen(Reducer(RNG.boolean))

  def listOfN[A](n: Int, g: Gen[A]): Gen[List[A]] =
    Gen(Reducer.sequence(List.fill(n)(g.sample)))

  // 연습문제 8.7
  def union[A](g1: Gen[A], g2: Gen[A]): Gen[A] =
    Gen.boolean flatMap (if (_) g1 else g2)

  // 연습문제 8.8
  def weighted[A](g1: (Gen[A], Double), g2: (Gen[A], Double)): Gen[A] = {
    val threshold = g1._2.abs / (g1._2.abs + g2._2.abs)

    Gen.double flatMap (d => if(d < threshold) g1._1 else g2._1)
  }

  case class Sized[A](forSize: Int => Gen[A]) extends SGen[A]
  case class Unsized[A](get: Gen[A]) extends SGen[A]

  implicit def unsized[A](g: Gen[A]): SGen[A] = Unsized(g)

  def listOf[A](g: Gen[A]): SGen[List[A]] =
    Sized(size=>listOfN(size, g))

  def listOf1[A](g: Gen[A]): SGen[List[A]] =
    Sized(n => g.listOfN(n max 1))
}

trait SGen[+A]
