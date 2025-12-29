/**
 * Phase 3 E2E 测试运行器
 * 
 * 直接运行：npx tsx src/cad/test/runE2ETest.ts
 */

import { runAllPhase3E2ETests } from './phase3E2ETest';

// 运行所有测试
runAllPhase3E2ETests().then(() => {
  console.log('\n✨ 测试完成！');
  process.exit(0);
}).catch((error) => {
  console.error('\n💥 测试失败：', error);
  process.exit(1);
});
