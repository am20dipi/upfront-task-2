class CreateTaskNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :task_notes do |t|
      t.text :content
      t.belongs_to :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
