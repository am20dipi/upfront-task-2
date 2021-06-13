class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      #t.belongs_to :completed_tasks, null: false, foreign_key: {on_delete: :cascade}
      
      

      t.timestamps
    end
  end
end
