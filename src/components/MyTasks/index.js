import {Component} from 'react'
import {v4} from 'uuid'
import {
  AppContainer,
  CreateTaskContainer,
  Form,
  Heading,
  LabelInputDiv,
  Label,
  Input,
  SelectInput,
  OptionInput,
  FormBtn,
  MainHeading,
  TagListUl,
  TagBtn,
  TagList,
  TaskUl,
  NoTaskText,
  TaskListElement,
  TaskText,
  TaskTag,
  AddTaskContainer,
} from './styledComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]
class MyTasks extends Component {
  state = {
    inputText: '',
    inputTag: tagsList[0].optionId,
    taskList: [],
    activeTag: 'INITIAL',
  }

  changeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeTag = event => {
    this.setState({inputTag: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {inputTag, inputText} = this.state
    const newTask = {
      id: v4(),
      task: inputText,
      tag: inputTag,
    }
    if (inputText.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        inputText: '',
        inputTag: '',
      }))
    }
  }

  //   onClickActiveTag = event => {
  //     const {activeTag} = this.state
  //     this.setState((activeTag: event.target.value))
  //   }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderCreateTaskView = () => {
    const {inputText, inputTag} = this.state
    return (
      <CreateTaskContainer>
        <Form onSubmit={this.submitForm}>
          <Heading>Create a Task!</Heading>
          <LabelInputDiv>
            <Label htmlFor="inputText">Task</Label>
            <Input
              type="text"
              placeholder="Enter the task here"
              onChange={this.changeInput}
              value={inputText}
              id="inputText"
            />
          </LabelInputDiv>
          <LabelInputDiv>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              onChange={this.onChangeTag}
              value={inputTag}
              id="selectTag"
            >
              {tagsList.map(each => (
                <OptionInput value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </LabelInputDiv>
          <FormBtn type="submit">Add Task</FormBtn>
        </Form>
      </CreateTaskContainer>
    )
  }

  renderTaskCard = () => {
    const {taskList, activeTag} = this.state
    const filteredTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tag === activeTag)
    return (
      <>
        {filteredTaskList.map(each => (
          <TaskListElement key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TaskTag>{each.tag}</TaskTag>
          </TaskListElement>
        ))}
      </>
    )
  }

  renderAddTaskView = () => {
    const {taskList, activeTag} = this.state
    return (
      <AddTaskContainer>
        <MainHeading>Tags</MainHeading>
        <TagListUl>
          {tagsList.map(eachItem => {
            const isActive = activeTag === eachItem.optionId
            return (
              <TagList key={eachItem.optionId}>
                <TagBtn
                  type="button"
                  value={eachItem.optionId}
                  onClick={this.onClickActiveTag}
                  isActive={isActive}
                >
                  {eachItem.displayText}
                </TagBtn>
              </TagList>
            )
          })}
        </TagListUl>
        <MainHeading>Tasks</MainHeading>
        <TaskUl>
          {taskList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TaskUl>
      </AddTaskContainer>
    )
  }

  render() {
    return (
      <AppContainer>
        {this.renderCreateTaskView()}
        {this.renderAddTaskView()}
      </AppContainer>
    )
  }
}
export default MyTasks
