import { describe, it, expect, beforeEach } from 'vitest';
import '../admin.js';
import '../services/todoService.js';

describe('services/todoService.js - Task management & storage', () => {
  beforeEach(() => {
    window.performPostCrudRefresh = async () => {};
    window.setCaseTasks([]);
    window.safeStorage.remove('cmCaseTasks');
  });

  it('should initialize caseTasks as array on window', () => {
    expect(Array.isArray(window.caseTasks)).toBe(true);
  });

  it('should save and load case tasks from safeStorage', () => {
    const mockTasks = [
      {
        id: 'task-1',
        title: 'File Rejoinder Affidavit',
        caseNo: '124/2026',
        priority: 'high',
        status: 'pending',
      },
      {
        id: 'task-2',
        title: 'Submit Vakalatnama',
        caseNo: '55/2026',
        priority: 'medium',
        status: 'completed',
      }
    ];

    window.setCaseTasks(mockTasks);
    window.saveCaseTasksLocally();

    // Verify storage has the serialized JSON
    const stored = window.safeStorage.get('cmCaseTasks');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored);
    expect(parsed.length).toBe(2);
    expect(parsed[0].title).toBe('File Rejoinder Affidavit');

    // Clear memory and reload from storage
    window.setCaseTasks([]);
    window.loadCaseTasks();
    expect(window.caseTasks.length).toBe(2);
    expect(window.caseTasks[0].id).toBe('task-1');
  });

  it('should update task status correctly between pending and completed', async () => {
    window.setCaseTasks([
      {
        id: 'task-10',
        title: 'Inspect lower court record',
        caseNo: '99/2026',
        status: 'pending',
      }
    ]);
    window.saveCaseTasksLocally();

    // Toggle task
    await window.toggleTaskStatus('task-10');
    expect(window.caseTasks[0].status).toBe('completed');

    // Toggle back
    await window.toggleTaskStatus('task-10');
    expect(window.caseTasks[0].status).toBe('pending');
  });

  it('should delete task correctly', async () => {
    window.setCaseTasks([
      { id: 't-1', title: 'Task 1', status: 'pending' },
      { id: 't-2', title: 'Task 2', status: 'pending' }
    ]);
    window.saveCaseTasksLocally();

    await window.deleteCaseTask('t-1');
    expect(window.caseTasks.length).toBe(1);
    expect(window.caseTasks[0].id).toBe('t-2');
  });
});
