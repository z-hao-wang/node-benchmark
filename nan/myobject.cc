#include "myobject.h"

Nan::Persistent<v8::Function> MyObject::constructor;

MyObject::MyObject(int value): smakeeper_(value) {}

MyObject::~MyObject() {}


void MyObject::Init(v8::Local<v8::Object> exports) {
  v8::Local<v8::Context> context = exports->CreationContext();
  Nan::HandleScope scope;

  // Prepare constructor template
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  Nan::SetPrototypeMethod(tpl, "get", Get);
  Nan::SetPrototypeMethod(tpl, "add", Add);
  Nan::SetPrototypeMethod(tpl, "pureCpp", PureCpp);

  constructor.Reset(tpl->GetFunction(context).ToLocalChecked());
  exports->Set(context,
               Nan::New("MyObject").ToLocalChecked(),
               tpl->GetFunction(context).ToLocalChecked());
}

void MyObject::New(const Nan::FunctionCallbackInfo<v8::Value>& info) {
  v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext();
  if (info.IsConstructCall()) {
    // Invoked as constructor: `new MyObject(...)`
    int value =
        info[0]->IsUndefined() ? 0 : info[0]->NumberValue(context).FromJust();

    MyObject* obj = new MyObject(value);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    // Invoked as plain function `MyObject(...)`, turn into construct call.
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New<v8::Function>(constructor);
    info.GetReturnValue().Set(
        cons->NewInstance(context, argc, argv).ToLocalChecked());
  }
}

void MyObject::Get(const Nan::FunctionCallbackInfo<v8::Value>& info) {
  MyObject* obj = ObjectWrap::Unwrap<MyObject>(info.Holder());
  info.GetReturnValue().Set(Nan::New((double)obj->smakeeper_.get()));
}


void MyObject::Add(const Nan::FunctionCallbackInfo<v8::Value>& info) {
  v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext();
  double value = info[0]->NumberValue(context).FromJust();
  MyObject* obj = ObjectWrap::Unwrap<MyObject>(info.Holder());
  obj->smakeeper_.add(value);
}

void MyObject::PureCpp(const Nan::FunctionCallbackInfo<v8::Value>& info) {
  MyObject* obj = ObjectWrap::Unwrap<MyObject>(info.Holder());
  for (int i = 0; i < 50000; i++) {
    obj->smakeeper_.add(rand());
  }
}
