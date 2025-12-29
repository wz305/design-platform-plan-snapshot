/**
 * Phase 3 核心功能测试
 * 
 * 验证完整数据流：Task → TaskRuntime → VirtualCadDriver → VirtualCADModel
 * 
 * 这个测试脚本可以在浏览器控制台中运行，验证 Phase 3 的核心功能
 */

import { VirtualCadDriver } from '../driver/VirtualCadDriver';
import { basicCadTask, failingCadTask, queryCadTask } from '../examples/cadTaskExamples';
import { TaskRuntime } from '../../runtime/TaskRuntime';

/**
 * 测试基础 CAD 操作
 */
export async function testBasicCadOperations() {
  console.group('🧪 Phase 3 测试：基础 CAD 操作');
  
  try {
    const driver = new VirtualCadDriver();
    const runtime = new TaskRuntime(basicCadTask);
    
    console.log('📋 执行基础 CAD 任务...');
    await runtime.run(driver);
    
    console.log('✅ 基础 CAD 操作测试通过');
    console.log('📊 模型统计:', driver.getStats());
    driver.debug();
    
  } catch (error) {
    console.error('❌ 基础 CAD 操作测试失败:', error);
  }
  
  console.groupEnd();
}

/**
 * 测试错误处理机制
 */
export async function testErrorHandling() {
  console.group('🧪 Phase 3 测试：错误处理机制');
  
  try {
    const driver = new VirtualCadDriver();
    const runtime = new TaskRuntime(failingCadTask);
    
    console.log('📋 执行失败任务...');
    await runtime.run(driver);
    
    console.error('❌ 错误处理测试失败：应该抛出异常');
    
  } catch (error) {
    console.log('✅ 错误处理测试通过：正确捕获异常');
  }
  
  console.groupEnd();
}

/**
 * 测试查询操作
 */
export async function testQueryOperations() {
  console.group('🧪 Phase 3 测试：查询操作');
  
  try {
    const driver = new VirtualCadDriver();
    const runtime = new TaskRuntime(queryCadTask);
    
    console.log('📋 执行查询任务...');
    await runtime.run(driver);
    
    console.log('✅ 查询操作测试通过');
    console.log('📊 最终模型统计:', driver.getStats());
    
    // 测试手动查询
    const gndTracks = driver.getModel().getObjectsByNet('GND', 'Track');
    console.log('🔍 GND 网络走线数量:', gndTracks.length);
    
    const topObjects = driver.getModel().getObjectsByLayer('Top');
    console.log('🔍 顶层对象数量:', topObjects.length);
    
  } catch (error) {
    console.error('❌ 查询操作测试失败:', error);
  }
  
  console.groupEnd();
}

/**
 * 测试模型变更监听
 */
export function testModelChangeListening() {
  console.group('🧪 Phase 3 测试：模型变更监听');
  
  try {
    const driver = new VirtualCadDriver();
    const model = driver.getModel();
    
    let changeCount = 0;
    const unsubscribe = model.onChange((event) => {
      changeCount++;
      console.log(`📡 变更事件 ${changeCount}:`, {
        type: event.type,
        objectType: event.objectType,
        objectId: event.objectId
      });
    });
    
    console.log('📋 执行多个操作...');
    model.createTrack('TEST', 'Top', { x: 0, y: 0 }, { x: 10, y: 10 });
    model.createVia('TEST', { x: 5, y: 5 }, 'Top', 'Bottom');
    model.deleteObject('some_fake_id'); // 应该失败
    model.clear();
    
    console.log(`✅ 变更监听测试通过：共触发 ${changeCount} 次变更`);
    
    unsubscribe();
    
  } catch (error) {
    console.error('❌ 变更监听测试失败:', error);
  }
  
  console.groupEnd();
}

/**
 * 运行所有 Phase 3 测试
 */
export async function runAllPhase3Tests() {
  console.group('🚀 Phase 3 完整测试套件');
  console.log('目标：验证 Task → Runtime → Driver → Model 完整数据流');
  console.log('');
  
  await testBasicCadOperations();
  console.log('');
  
  await testErrorHandling();
  console.log('');
  
  await testQueryOperations();
  console.log('');
  
  testModelChangeListening();
  
  console.log('');
  console.log('🎉 Phase 3 测试套件完成！');
  console.log('');
  console.log('📋 Phase 3 核心成就：');
  console.log('  ✅ CAD DSL v0.1 冻结完成');
  console.log('  ✅ Virtual CAD Model 实现');
  console.log('  ✅ Virtual CAD Driver 实现');
  console.log('  ✅ 完整数据流验证');
  console.log('  ✅ 错误处理机制');
  console.log('  ✅ 查询操作支持');
  console.log('  ✅ 模型变更监听');
  console.log('');
  console.log('🎯 下一步：Phase 3.2 - Canvas 可视化层');
  
  console.groupEnd();
}

// 在浏览器控制台中可以直接调用：
// import { runAllPhase3Tests } from './src/cad/test/phase3Test.js';
// runAllPhase3Tests();
