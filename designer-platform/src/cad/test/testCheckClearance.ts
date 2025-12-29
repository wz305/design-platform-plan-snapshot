/**
 * CheckClearance功能测试脚本
 * 
 * 专门测试间距检查功能
 */

import { createSimplePCB } from './pcbTestData';
import { VirtualCadDriver } from '../driver/VirtualCadDriver';

/**
 * 测试CheckClearance指令
 */
export async function testCheckClearance() {
  console.log('🧪 开始测试CheckClearance功能...');
  
  try {
    // 创建PCB任务
    const pcbTask = createSimplePCB();
    console.log('✅ PCB任务创建成功:', pcbTask.id);
    
    // 创建虚拟驱动
    const driver = new VirtualCadDriver();
    console.log('✅ VirtualCadDriver创建成功');
    
    // 先执行所有创建步骤
    console.log('🚀 开始执行PCB创建步骤...');
    const createSteps = pcbTask.steps.filter(step => 
      ['CreateTrack', 'CreateVia'].includes(step.op)
    );
    
    for (const step of createSteps) {
      try {
        await driver.execute(step);
        console.log(`✅ 创建步骤 ${step.id} 执行成功`);
      } catch (error) {
        console.error(`❌ 创建步骤 ${step.id} 执行失败:`, error);
        return { success: false, error };
      }
    }
    
    // 显示当前模型状态
    const stats = driver.getStats();
    console.log('\n📊 模型状态:', stats);
    
    // 执行间距检查
    console.log('\n🔍 开始执行间距检查...');
    const checkStep = pcbTask.steps.find(step => step.op === 'CheckClearance');
    
    if (!checkStep) {
      throw new Error('PCB任务中未找到CheckClearance步骤');
    }
    
    try {
      const result = await driver.execute(checkStep);
      console.log('✅ CheckClearance执行成功');
      
      // 分析检查结果
      const checkData = (result as any).data;
      console.log('\n📋 间距检查结果:');
      console.log('检查类型:', checkData.checkType);
      console.log('最小间距要求:', checkData.minClearance + 'mm');
      console.log('发现违规数量:', checkData.violations.length);
      console.log('摘要:', checkData.summary);
      
      if (checkData.violations.length > 0) {
        console.log('\n⚠️ 发现的违规:');
        checkData.violations.forEach((violation: any, index: number) => {
          console.log(`\n${index + 1}. ${violation.type}`);
          console.log(`   距离: ${violation.distance}mm (要求: ${violation.required}mm)`);
          console.log(`   位置: (${violation.location.x}, ${violation.location.y})`);
          
          if (violation.type === 'TrackToTrack') {
            console.log(`   走线1: ${violation.net1} -> ${violation.object1Id}`);
            console.log(`   走线2: ${violation.net2} -> ${violation.object2Id}`);
          } else if (violation.type === 'TrackToVia') {
            console.log(`   走线: ${violation.trackNet} -> ${violation.trackId}`);
            console.log(`   过孔: ${violation.viaNet} -> ${violation.viaId}`);
          } else if (violation.type === 'ViaToVia') {
            console.log(`   过孔1: ${violation.net1} -> ${violation.via1Id}`);
            console.log(`   过孔2: ${violation.net2} -> ${violation.via2Id}`);
          }
        });
      }
      
      return { 
        success: true, 
        violations: checkData.violations,
        summary: checkData.summary,
        stats 
      };
      
    } catch (error) {
      console.error('❌ CheckClearance执行失败:', error);
      return { success: false, error };
    }
    
  } catch (error) {
    console.error('❌ CheckClearance测试失败:', error);
    return { success: false, error };
  }
}

/**
 * 测试不同参数的CheckClearance
 */
export async function testCheckClearanceParameters() {
  console.log('\n🧪 开始测试CheckClearance参数...');
  
  const driver = new VirtualCadDriver();
  
  // 创建简单的测试场景
  await driver.execute({
    id: 'track1',
    op: 'CreateTrack',
    args: {
      net: 'VCC',
      layer: 'Top',
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
  });
  
  await driver.execute({
    id: 'track2',
    op: 'CreateTrack',
    args: {
      net: 'GND',
      layer: 'Top',
      from: { x: 0, y: 0.5 }, // 0.5mm间距
      to: { x: 10, y: 0.5 }
    }
  });
  
  // 测试不同的最小间距要求
  const testCases = [
    { minClearance: 0.3, expectedViolations: 1, description: '严格检查 (0.3mm)' },
    { minClearance: 0.4, expectedViolations: 0, description: '宽松检查 (0.4mm)' },
    { minClearance: 0.6, expectedViolations: 0, description: '很宽松检查 (0.6mm)' }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n🔍 测试: ${testCase.description}`);
    
    try {
      const checkResult = await driver.execute({
        id: `check-${testCase.minClearance}`,
        op: 'CheckClearance',
        args: {
          minClearance: testCase.minClearance
        }
      });
      
      const checkData = (checkResult as any).data;
      const actualViolations = checkData.violations.length;
      
      if (actualViolations === testCase.expectedViolations) {
        console.log(`✅ 通过: 发现 ${actualViolations} 处违规 (期望: ${testCase.expectedViolations})`);
      } else {
        console.log(`❌ 失败: 发现 ${actualViolations} 处违规 (期望: ${testCase.expectedViolations})`);
      }
      
    } catch (error) {
      console.error(`❌ 测试失败:`, error);
    }
  }
}

/**
 * 运行所有CheckClearance测试
 */
export async function runCheckClearanceTests() {
  console.log('🚀 开始运行CheckClearance功能测试...\n');
  
  const basicTest = await testCheckClearance();
  await testCheckClearanceParameters();
  
  console.log('\n📋 测试总结:');
  console.log('基础功能测试:', basicTest.success ? '✅ 通过' : '❌ 失败');
  console.log('参数测试: ✅ 完成');
  
  if (basicTest.success) {
    console.log('\n🎉 CheckClearance功能测试完成!');
    console.log(`📊 发现违规: ${basicTest.violations?.length || 0} 处`);
    console.log('📋 现在可以在UI中测试完整的PCB检查功能了!');
  } else {
    console.log('\n❌ CheckClearance功能测试失败，请检查错误信息');
  }
  
  return { basicTest };
}

// 如果直接运行此文件，执行测试
if (typeof window === 'undefined') {
  // Node.js环境下直接运行
  runCheckClearanceTests().catch(console.error);
}
