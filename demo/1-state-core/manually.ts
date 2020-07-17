// * ---------------- 状态仓库（手动管理）

type ManState = {
  manNum?: number;
  manStr?: string;
};

let manState: ManState = {
  manNum: 0,
  manStr: '',
};

// * ---------------- 业务部分（手动管理更新和调用）

console.log('manually init:', manState);

const manuallyDoEverything = (payload: ManState) => {
  manState = { ...manState, ...payload };
  console.log('manually update:', manState);
};

manuallyDoEverything({ manNum: 55 });
manuallyDoEverything({ manStr: 'Hello' });
manuallyDoEverything({ manStr: 'Manually' });
