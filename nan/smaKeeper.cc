#include "smaKeeper.h"
#include "slidingWindowArr.h"
#include "slidingWindowArr.cc"
#include <numeric>

SmaKeeper::SmaKeeper(int period): _slidingWindowArr(period)
 {

  this->_sma = 0.0;
  this->_period = period;
}

void SmaKeeper::add(float price)
{

  if (this->_slidingWindowArr.length() < this->_period)
  {
    this->_slidingWindowArr.push(price);
    float sum = 0;
    for (int i = 0; i < this->_slidingWindowArr.length(); i++)
    {
      sum += this->_slidingWindowArr.get(i);
    }
    this->_sma = sum / this->_slidingWindowArr.length();
  }
  else
  {
    float removedValue = this->_slidingWindowArr.first();

    this->_slidingWindowArr.push(price);

    this->_sma = this->_sma - removedValue / this->_period + price / this->_period;
  }
}

float SmaKeeper::get() const
{
  return this->_sma;
}
