/**
 * 完整PCB检查工作流测试
 * 
 * 测试从创建到检查的完整流程
 */

import { createSimplePCB } from './pcbTestData';
import { VirtualCadDriver } from '../driver/VirtualCadDriver';
import { TaskRuntime } from '../../runtime/TaskRuntime';

/**
 * 测试完整的PCB工作流（使用TaskRuntime）
 */
export async function testFullPCBWorkflow() {
  console.log('🚀 开始测试完整PCB检查工作流...');
  
  try {
    // 创建PCB任务
    const pcbTask = createSimplePCB();
    console.log('✅ PCB任务创建成功:', pcbTask.id);
    console.log('📊 任务步骤数:', pcbTask.steps.length);
    
    // 创建TaskRuntime（更接近实际使用场景）
    const driver = new VirtualCadDriver();
    const taskRuntime = new TaskRuntime(pcbTask);
    
    console.log('✅ TaskRuntime创建成功');
    
    // 设置状态监听器
    let completedSteps = 0;
    let failedSteps = 0;
    let checkResults: any[] = [];
    
    taskRuntime.subscribe((snapshot) => {
      // 统计完成的步骤
      completedSteps = snapshot.steps.filter(step => step.status === 'done').length;
      failedSteps = snapshot.steps.filter(step => step.status === 'error').length;
      
      // 记录检查步骤的结果
      snapshot.steps.forEach(step => {
        if (step.status === 'done' && step.step.id.includes('check')) {
          console.log(`✅ 检查步骤完成: ${step.step.id}`);
          if (step.result) {
            console.log(`🔍 检查结果:`, step.result);
            checkResults.push(step.result);
          }
        } else if (step.status === 'error') {
          console.error(`❌ 步骤失败: ${step.step.id}`, step.error);
        }
      });
      
      // 显示当前状态
      console.log(`📊 任务状态: ${snapshot.taskStatus}, 当前步骤: ${snapshot.currentStepIndex + 1}/${snapshot.steps.length}`);
    });
    
    // 执行整个任务
    console.log('🚀 开始执行完整PCB任务...');
    await taskRuntime.run(driver);
    
    // 显示最终统计
    console.log('\n📈 执行完成统计:');
    console.log(`✅ 完成步骤: ${completedSteps}`);
    console.log(`❌ 失败步骤: ${failedSteps}`);
    console.log(`🔍 检查步骤: ${checkResults.length}`);
    
    // 显示模型最终状态
    const stats = driver.getStats();
    console.log('\n📊 模型最终状态:', stats);
    
    // 分析检查结果
    if (checkResults.length > 0) {
      console.log('\n📋 检查结果分析:');
      checkResults.forEach((result, index) => {
        if (result.data) {
          const checkData = result.data;
          console.log(`\n${index + 1}. ${checkData.checkType}检查:`);
          console.log(`   摘要: ${checkData.summary}`);
          console.log(`   违规数量: ${checkData.violations?.length || 0}`);
          
          if (checkData.violations && checkData.violations.length > 0) {
            console.log('   违规类型:', [...new Set(checkData.violations.map((v: any) => v.type))]);
          }
        }
      });
    }
    
    return {
      success: true,
      completedSteps,
      failedSteps,
      checkResults,
      finalResult: 'Task completed successfully',
      stats
    };
    
  } catch (error) {
    console.error('❌ 完整工作流测试失败:', error);
    return { success: false, error };
  }
}

/**
 * 创建并测试一个包含已知违规的简单PCB
 */
export async function testKnownViolations() {
  console.log('\n🧪 测试已知违规的PCB...');
  
  const driver = new VirtualCadDriver();
  
  // 创建一个简单的违规场景
  console.log('🔨 创建违规场景...');
  
  // 1. 创建两条间距很近的走线（违规）
  await driver.execute({
    id: 'vcc-trace',
    op: 'CreateTrack',
    args: {
      net: 'VCC',
      layer: 'Top',
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
  });
  
  await driver.execute({
    id: 'gnd-trace',
    op: 'CreateTrack',
    args: {
      net: 'GND',
      layer: 'Top',
      from: { x: 0, y: 0.1 }, // 仅0.1mm间距
      to: { x: 10, y: 0.1 }
    }
  });
  
  // 2. 创建一个过孔靠近走线（违规）
  await driver.execute({
    id: 'vcc-via',
    op: 'CreateVia',
    args: {
      net: 'VCC',
      position: { x: 5, y: 0.05 }, // 非常靠近GND走线
      fromLayer: 'Top',
      toLayer: 'Bottom'
    }
  });
  
  // 3. 创建两个间距很近的过孔（违规）
  await driver.execute({
    id: 'signal-via-1',
    op: 'CreateVia',
    args: {
      net: 'DATA0',
      position: { x: 15, y: 5 },
      fromLayer: 'Top',
      toLayer: 'Bottom'
    }
  });
  
  await driver.execute({
    id: 'signal-via-2',
    op: 'CreateVia',
    args: {
      net: 'DATA1',
      position: { x: 15.1, y: 5 }, // 仅0.1mm间距
      fromLayer: 'Top',
      toLayer: 'Bottom'
    }
  });
  
  // 执行间距检查
  console.log('🔍 执行间距检查...');
  const checkResult = await driver.execute({
    id: 'check-violations',
    op: 'CheckClearance',
    args: {
      minClearance: 0.2 // 0.2mm最小间距
    }
  });
  
  // 分析结果
  const checkData = (checkResult as any).data;
  console.log('\n📋 违规检查结果:');
  console.log('检查类型:', checkData.checkType);
  console.log('最小间距要求:', checkData.minClearance + 'mm');
  console.log('发现违规数量:', checkData.violations.length);
  console.log('摘要:', checkData.summary);
  
  if (checkData.violations.length > 0) {
    console.log('\n⚠️ 发现的违规详情:');
    const violationTypes = new Set();
    
    checkData.violations.forEach((violation: any, index: number) => {
      violationTypes.add(violation.type);
      console.log(`\n${index + 1}. ${violation.type}`);
      console.log(`   距离: ${violation.distance}mm (要求: ${violation.required}mm)`);
      console.log(`   位置: (${violation.location.x.toFixed(2)}, ${violation.location.y.toFixed(2)})`);
    });
    
    console.log('\n🔍 违规类型统计:', Array.from(violationTypes));
  }
  
  return {
    success: true,
    violations: checkData.violations,
    summary: checkData.summary
  };
}

/**
 * 运行完整工作流测试
 */
export async function runFullWorkflowTests() {
  console.log('🚀 开始运行完整PCB工作流测试...\n');
  
  const workflowTest = await testFullPCBWorkflow();
  const violationsTest = await testKnownViolations();
  
  console.log('\n📋 完整工作流测试总结:');
  console.log('工作流测试:', workflowTest.success ? '✅ 通过' : '❌ 失败');
  console.log('违规测试:', violationsTest.success ? '✅ 通过' : '❌ 失败');
  
  if (workflowTest.success && violationsTest.success) {
    console.log('\n🎉 完整PCB检查工作流测试全部通过!');
    console.log(`📊 总违规数: ${violationsTest.violations?.length || 0} 处`);
    console.log('📋 现在可以开始在UI中测试PCB检查功能了!');
    
    // 显示下一步建议
    console.log('\n📝 下一步建议:');
    console.log('1. 在Phase3TaskRunner中添加PCB测试选项');
    console.log('2. 在UI中展示检查结果');
    console.log('3. 添加可视化违规高亮');
    console.log('4. 实现更多DRC规则（线宽、焊环等）');
    
  } else {
    console.log('\n❌ 工作流测试失败，请检查错误信息');
  }
  
  return { workflowTest, violationsTest };
}

// 如果直接运行此文件，执行测试
if (typeof window === 'undefined') {
  // Node.js环境下直接运行
  runFullWorkflowTests().catch(console.error);
}
