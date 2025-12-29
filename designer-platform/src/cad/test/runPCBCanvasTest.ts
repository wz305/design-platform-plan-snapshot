/**
 * PCB Canvas 测试运行器
 * 
 * 用于快速测试和验证PCBCanvas可视化功能
 */

import { testPCBCanvasVisualization, runBrowserTest } from './testPCBCanvas';

/**
 * 运行PCBCanvas测试套件
 */
async function runPCBCanvasTestSuite() {
  console.log('🚀 启动PCBCanvas测试套件...');
  console.log('=' .repeat(50));
  
  try {
    // 1. 运行基础功能测试
    console.log('📋 步骤1: 基础功能测试');
    const testResult = await testPCBCanvasVisualization();
    
    if (testResult.success) {
      console.log('✅ 基础功能测试通过');
      console.log('📊 测试数据准备就绪，可以用于Canvas渲染');
    } else {
      console.error('❌ 基础功能测试失败:', testResult.error);
      return;
    }
    
    console.log('\n🌐 步骤2: 浏览器测试指南');
    runBrowserTest();
    
    console.log('\n🎯 测试完成!');
    console.log('📝 总结:');
    console.log('- ✅ PCB数据模型验证通过');
    console.log('- ✅ 任务执行验证通过');
    console.log('- ✅ 违规数据提取验证通过');
    console.log('- 🎨 Canvas组件已集成到UI');
    console.log('- 🌐 请在浏览器中验证视觉效果');
    
    console.log('\n🔗 快速测试链接:');
    console.log('http://localhost:5178/');
    console.log('选择 "simple-pcb-check" 任务 → 点击 "执行任务" → 观察 "PCB可视化"');
    
  } catch (error) {
    console.error('❌ 测试套件执行失败:', error);
  }
}

/**
 * 导出测试函数供外部调用
 */
export {
  runPCBCanvasTestSuite,
  testPCBCanvasVisualization,
  runBrowserTest
};

// 如果直接运行此文件，执行测试套件
if (typeof window === 'undefined') {
  // Node.js 环境
  runPCBCanvasTestSuite().catch(console.error);
} else {
  // 浏览器环境
  console.log('🌐 在浏览器控制台中运行: runPCBCanvasTestSuite()');
  (window as any).runPCBCanvasTestSuite = runPCBCanvasTestSuite;
}
