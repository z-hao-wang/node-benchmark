#include "smaKeeper.h"
#include "slidingWindowArr.h"
#include "slidingWindowArr.cc"
#include <numeric>
using namespace Napi;
using namespace std;

Napi::FunctionReference SmaKeeper::constructor;

Napi::Object SmaKeeper::Init(Napi::Env env, Napi::Object exports)
{

  Napi::HandleScope scope(env);

  Napi::Function func =
      DefineClass(env,
                  "SmaKeeper",
                  {InstanceMethod("add", &SmaKeeper::add),
                   InstanceMethod("get", &SmaKeeper::get)});

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("SmaKeeper", func);
  return exports;
}

SmaKeeper::SmaKeeper(const Napi::CallbackInfo &info)
    : Napi::ObjectWrap<SmaKeeper>(info)
{
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  int length = info.Length();

  if (length <= 0 || !info[0].IsNumber())
  {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    return;
  }

  Napi::Number period = info[0].As<Napi::Number>();
  this->_period = period.Uint32Value();
  this->_slidingWindowArr = new SlidingWindowArr<float>((int)this->_period);
}

Napi::Value SmaKeeper::add(const Napi::CallbackInfo &info)
{
  Napi::Number price = info[0].As<Napi::Number>();
  float newValue = price.FloatValue();
  if (this->_slidingWindowArr->length() < this->_period)
  {
    this->_slidingWindowArr->push(newValue);
    float sum = 0;
    for (int i = 0; i < this->_slidingWindowArr->length(); i++)
    {
      sum += this->_slidingWindowArr->get(i);
    }
    this->_sma = sum / this->_slidingWindowArr->length();
  }
  else
  {
    float removedValue = this->_slidingWindowArr->first();
    this->_slidingWindowArr->push(newValue);
    this->_sma = this->_sma - removedValue / this->_period + newValue / this->_period;
  }

  Napi::Value ret = Napi::Value(info.Env(), 0);
  return ret;
}

Napi::Value SmaKeeper::get(const Napi::CallbackInfo &info)
{
  Napi::Value ret = Napi::Number::New(info.Env(), this->_sma).As<Napi::Value>();
  return ret;
}
