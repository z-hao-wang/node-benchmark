#include <napi.h>
#include "smaKeeper.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
  return SmaKeeper::Init(env, exports);
}

NODE_API_MODULE(addon, InitAll)
