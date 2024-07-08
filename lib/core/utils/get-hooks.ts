import path from "path";

// hooks可以理解为更抽象的middleware 可以作为启动项 其中也return了middleware
export const getHooks = async (hooks: string[]) => {
  const len = hooks.length;
  const result: any[] = [];
  for (let i = 0; i < len; i++) {
    const hook = await import(path.join(__dirname, "../hooks", hooks[i]));

    result.push(hook);
  }
  return result;
};
