#ifndef SLIDING_WINDOW_ARR_H
#define SLIDING_WINDOW_ARR_H

template <class T>
class SlidingWindowArr
{
public:
  SlidingWindowArr(int maxLen);
  void push(T value);
  T get(int index) const;
  T first() const;
  T last() const;
  int length() const;
  int getMaxLen() const;

private:
  int _maxLen;
  T *_historyValues;
  int _cursor;
  int _dataLen;
};

#endif
