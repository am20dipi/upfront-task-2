class CreateCompletedTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :completed_tasks do |t|
      t.boolean :completed
      t.timestamps
    end
  end
end
