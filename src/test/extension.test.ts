import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {

  suiteSetup(() => {
    console.log('Starting Extension Test Suite...');
  });

  suiteTeardown(() => {
    console.log('Finished Extension Test Suite.');
  });

  setup(() => {
    console.log('Starting a new test...');
  });

  teardown(() => {
    console.log('Test completed.');
  });

  test('Negative test - Value not found', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  test('Positive test - Value found', () => {
    assert.strictEqual(0, [1, 2, 3].indexOf(1));
    assert.strictEqual(2, [1, 2, 3].indexOf(3));
  });

  test('Error Handling Test', () => {
    assert.throws(() => {
      throw new Error('Test error');
    }, /Test error/, 'Expected error to be thrown with message "Test error"');
  });

});
