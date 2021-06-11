class TaskNoteSerializer
  include JSONAPI::Serializer
  attributes :content, :task_id
  #belongs_to :task
end
