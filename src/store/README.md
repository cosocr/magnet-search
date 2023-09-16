## How to use ?

### 1.import

```js
import { useUserStore } from '@/store/user'
const userStore = useUserStore()

// get
userStore.user.name
userStore.user.avatar

// set
userStore.user.name = 'zhangsan'

// function
userStore.login(form)
// function support async
await userStore.login(form)
```
