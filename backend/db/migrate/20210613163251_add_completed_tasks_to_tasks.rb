class AddCompletedTasksToTasks < ActiveRecord::Migration[6.1]
  def change
    add_reference :tasks, :completed_tasks, null: false, foreign_key: true
  end
end
