#include "slidingWindowArr.h"
#include <iostream>

template <class T>
SlidingWindowArr<T>::SlidingWindowArr(int maxLen)
{
  this->_dataLen = 0;
  this->_maxLen = maxLen;
  this->_cursor = 0;
  this->_historyValues = new T[this->_maxLen]();
}

template <class T>
void SlidingWindowArr<T>::push(T value)
{
  if (this->_dataLen < this->_maxLen)
  {
    this->_historyValues[this->_dataLen] = value;
    this->_dataLen++;
  }
  else
  {
    this->_historyValues[this->_cursor % this->_maxLen] = value;
    this->_cursor++;
    if (this->_cursor > this->_maxLen) {
        this->_cursor -= this->_maxLen;
    }
  }
}

template <class T>
T SlidingWindowArr<T>::get(int index) const
{
  if (index > this->_dataLen)
  {
    printf("tring to access index %d greater than dataLen %d", index, this->_dataLen);
    return this->_historyValues[0];
  }
  int newI = index;
  if (index < 0)
  {
    newI = this->_dataLen + index;
  }
  return this->_historyValues[(this->_cursor + newI) % this->_maxLen];
}

template <class T>
T SlidingWindowArr<T>::first() const
{
  return this->get(0);
}

template <class T>
T SlidingWindowArr<T>::last()  const
{
  return this->get(this->_dataLen);
}

template <class T>
int SlidingWindowArr<T>::length() const
{
  return this->_dataLen;
}

// private:
// void push(T value);
// T get(int index);
// T get(int index);
// int getMaxLen();

// uint32_t _maxLen;
// T *_historyValues;
// int _currentPointer;
// int _dataLen;
// }
// ;

// #endif
