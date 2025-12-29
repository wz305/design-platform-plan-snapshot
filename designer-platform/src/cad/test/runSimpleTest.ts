/**
 * Phase 3 简化测试运行器
 * 
 * 直接运行：npx tsx src/cad/test/runSimpleTest.ts
 */

import { runAllPhase3SimpleTests } from './phase3SimpleTest';

// 运行所有测试
runAllPhase3SimpleTests().then(() => {
  console.log('\n✨ 测试完成！');
  process.exit(0);
}).catch((error) => {
  console.error('\n💥 测试失败：', error);
  process.exit(1);
});
