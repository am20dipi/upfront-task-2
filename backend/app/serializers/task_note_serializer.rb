class TaskNoteSerializer
  include JSONAPI::Serializer
  attributes :content, :task_id
end
