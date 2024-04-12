import { inverse } from 'colors'

/**
 *
 * @param target
 * @param context
 * @decorator
 * @returns
 */
export function log<This, Args extends any[], Return>(target: (this: This, ...args: Args) => Return, context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>): (this: This, ...args: Args) => Return {
  const methodName = String(context.name)

  function replacementMethod(this: This, ...args: Args): Return {
    console.log(inverse(`Entering method '${methodName}'.`))
    const result = target.call(this, ...args)
    console.log(inverse(`Exiting method '${methodName}'.`))
    return result
  }

  return replacementMethod
}

/*
  interface Context {
    name: string;
    metadata: Record<symbol,any>;
  }
  
  function setMetadata(_target: any, context: Context) {
    context.metadata[context.name] = true;
  }
  
  class SomeClass {
    @setMetadata
    foo = 123;
  
    @setMetadata
    accessor bar = "hello!";
  
    @setMetadata
    baz() { }
  }
  
  const ourMetadata = SomeClass[Symbol.metadata];
  
  console.log(JSON.stringify(ourMetadata));
  // { "bar": true, "baz": true, "foo": true }
  */
