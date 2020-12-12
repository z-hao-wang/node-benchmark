#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <nan.h>
#include "smaKeeper.h"

class MyObject : public Nan::ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);

 private:
  explicit MyObject(int value = 0);
  ~MyObject();

  static void New(const Nan::FunctionCallbackInfo<v8::Value>& info);
  static void Get(const Nan::FunctionCallbackInfo<v8::Value>& info);
  static void Add(const Nan::FunctionCallbackInfo<v8::Value>& info);
  static void PureCpp(const Nan::FunctionCallbackInfo<v8::Value>& info);
  static Nan::Persistent<v8::Function> constructor;
  SmaKeeper smakeeper_;
};

#endif
