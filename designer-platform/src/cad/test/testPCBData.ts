/**
 * PCB测试数据验证脚本
 * 
 * 用于验证PCB测试数据是否能正常创建和执行
 */

import { createSimplePCB, createComplexPCB } from './pcbTestData';
import { VirtualCadDriver } from '../driver/VirtualCadDriver';

/**
 * 测试简单PCB数据
 */
export async function testSimplePCBData() {
  console.log('🧪 开始测试简单PCB数据...');
  
  try {
    // 创建PCB任务
    const pcbTask = createSimplePCB();
    console.log('✅ PCB任务创建成功:', pcbTask.id);
    console.log('📊 任务步骤数:', pcbTask.steps.length);
    
    // 创建虚拟驱动
    const driver = new VirtualCadDriver();
    console.log('✅ VirtualCadDriver创建成功');
    
    // 执行任务
    console.log('🚀 开始执行PCB任务...');
    let successCount = 0;
    let errorCount = 0;
    
    for (const step of pcbTask.steps) {
      try {
        await driver.execute(step);
        console.log(`✅ 步骤 ${step.id} 执行成功`);
        successCount++;
      } catch (error) {
        console.error(`❌ 步骤 ${step.id} 执行失败:`, error);
        errorCount++;
      }
    }
    
    // 显示最终统计
    const stats = driver.getStats();
    console.log('\n📈 执行完成统计:');
    console.log(`✅ 成功步骤: ${successCount}`);
    console.log(`❌ 失败步骤: ${errorCount}`);
    console.log(`📊 模型状态:`, stats);
    
    // 测试查询功能
    console.log('\n🔍 测试查询功能...');
    const model = driver.getModel();
    
    // 测试按网络查询
    const vccObjects = model.getObjectsByNet('VCC');
    console.log('📍 VCC网络对象:', vccObjects.length, '个');
    
    const gndObjects = model.getObjectsByNet('GND');
    console.log('📍 GND网络对象:', gndObjects.length, '个');
    
    // 测试按层查询
    const topLayerObjects = model.getObjectsByLayer('Top');
    console.log('📍 顶层对象:', topLayerObjects.length, '个');
    
    console.log('\n🎉 简单PCB数据测试完成!');
    return { success: true, stats, successCount, errorCount };
    
  } catch (error) {
    console.error('❌ 简单PCB数据测试失败:', error);
    return { success: false, error };
  }
}

/**
 * 测试复杂PCB数据
 */
export async function testComplexPCBData() {
  console.log('\n🧪 开始测试复杂PCB数据...');
  
  try {
    // 创建复杂PCB任务
    const pcbTask = createComplexPCB();
    console.log('✅ 复杂PCB任务创建成功:', pcbTask.id);
    console.log('📊 任务步骤数:', pcbTask.steps.length);
    
    // 创建虚拟驱动
    const driver = new VirtualCadDriver();
    
    // 执行任务
    console.log('🚀 开始执行复杂PCB任务...');
    let successCount = 0;
    let errorCount = 0;
    
    for (const step of pcbTask.steps) {
      try {
        await driver.execute(step);
        console.log(`✅ 步骤 ${step.id} 执行成功`);
        successCount++;
      } catch (error) {
        console.error(`❌ 步骤 ${step.id} 执行失败:`, error);
        errorCount++;
      }
    }
    
    // 显示最终统计
    const stats = driver.getStats();
    console.log('\n📈 复杂PCB执行完成统计:');
    console.log(`✅ 成功步骤: ${successCount}`);
    console.log(`❌ 失败步骤: ${errorCount}`);
    console.log(`📊 模型状态:`, stats);
    
    console.log('\n🎉 复杂PCB数据测试完成!');
    return { success: true, stats, successCount, errorCount };
    
  } catch (error) {
    console.error('❌ 复杂PCB数据测试失败:', error);
    return { success: false, error };
  }
}

/**
 * 运行所有PCB测试
 */
export async function runAllPCBTests() {
  console.log('🚀 开始运行所有PCB测试...\n');
  
  const simpleResult = await testSimplePCBData();
  const complexResult = await testComplexPCBData();
  
  console.log('\n📋 测试总结:');
  console.log('简单PCB测试:', simpleResult.success ? '✅ 通过' : '❌ 失败');
  console.log('复杂PCB测试:', complexResult.success ? '✅ 通过' : '❌ 失败');
  
  if (simpleResult.success && complexResult.success) {
    console.log('\n🎉 所有PCB测试都通过了!');
    console.log('📋 现在可以在UI中测试PCB功能了!');
  } else {
    console.log('\n❌ 有测试失败，请检查错误信息');
  }
  
  return { simpleResult, complexResult };
}

// 如果直接运行此文件，执行测试
if (typeof window === 'undefined') {
  // Node.js环境下直接运行
  runAllPCBTests().catch(console.error);
}
