#ifndef SMA_KEEPER_H
#define SMA_KEEPER_H
#include "slidingWindowArr.h"

class SmaKeeper
{
public:
  SmaKeeper(int period);
  void add(float val);
  float get() const;

private:

  int _period;
  SlidingWindowArr<float> _slidingWindowArr;
  float _sma;
};

#endif
