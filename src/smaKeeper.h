#ifndef SMA_KEEPER_H
#define SMA_KEEPER_H
#include "slidingWindowArr.h"
#include <napi.h>

class SmaKeeper : public Napi::ObjectWrap<SmaKeeper>
{
public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  SmaKeeper(const Napi::CallbackInfo &info);

private:
  static Napi::FunctionReference constructor;

  void add(const Napi::CallbackInfo &info);
  Napi::Value get(const Napi::CallbackInfo &info);

  uint32_t _period;
  SlidingWindowArr<float> *_slidingWindowArr;
  float _sma;
};

#endif
