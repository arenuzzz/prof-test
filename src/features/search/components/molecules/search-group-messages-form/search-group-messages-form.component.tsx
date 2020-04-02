import React, { ReactElement } from 'react';
import * as _ from 'lodash';
import {
  Form as FinalForm,
  Field,
  FormProps,
  FormSpy,
  useField,
} from 'react-final-form';
import { styled } from '@styles/theming';
import { Form } from '@ui/molecules/form';
import { SearchGroupProfilesCardList } from '@features/search/components/molecules/search-card-list';
// import Scrollbars from 'react-custom-scrollbars';
import { Button } from '@ui/atoms/button';
import { Input } from '@ui/atoms/input';
import { formatValue } from '@lib/format';
import { DatePicker } from '@ui/atoms/date-picker';
import {
  groupProfilesCardsFetching,
  resetCheckedGroupProfileIds,
  $initialsParts,
  debouncedSetInitialsParts,
  setInitialsParts,
  saveSearchGroupMessagesFormValues,
} from '@features/search/model/group-messages-search';
import { useStore, createStoreConsumer } from 'effector-react';
import { createStore, createEvent, guard, sample } from '@lib/effector';

export type FormValues = {
  keyword?: string;
  date?: {
    fromDate?: Date | null;
    toDate?: Date | null;
  };
  profileIds?: number[];
};

export type SearchGroupMessagesFormProps = FormProps<FormValues> & {
  minDate: Date;
  maxDate: Date;
  groupId: number;
  initialValues: FormValues;
};

const StyledSearchForm = styled(Form)`
  position: relative;
  height: 100%;
  padding-top: 4px;

  .form-content {
    height: 100%;
    margin-bottom: 66px;

    .form-fields {
      position: relative;
      padding: 0 28px 0;

      & > *:not(:first-child) {
        margin-top: 10px;
      }

      .date-wrapper {
        display: flex;
        justify-content: space-between;

        & > :first-child {
          margin-right: 8px;
        }
      }
    }
  }

  button[type='submit'] {
    position: absolute;
    bottom: 14px;
    left: 28px;

    margin: 0;

    width: calc(100% - 56px);
  }
`;

function AutoSave() {
  return (
    <FormSpy
      subscription={{ values: true }}
      onChange={(props) => {
        saveSearchGroupMessagesFormValues(props.values);
      }}
    />
  );
}

const StyledSearchProfiles = styled('div')`
  margin-top: 18px;

  height: 100%;

  border-top: 1px solid ${(p) => p.theme.colors.gray_2};

  display: flex;
  flex-direction: column;

  .form-fields {
    margin-top: 18px;
  }

  .group-card-list-wrapper {
    flex: 1;

    padding: 8px 0px 0 28px;

    height: 100%;
    margin-bottom: 158px;

    .ReactVirtualized__Grid.ReactVirtualized__List {
      padding-right: 10px !important;
    }
  }
`;

function GroupProfilesCardList({ groupId }) {
  const { $list, getListData, resetListData } = groupProfilesCardsFetching;
  const { data, isLoading } = useStore($list);
  const initialsParts = useStore($initialsParts);

  function loadMoreRows() {
    return new Promise((resolve) => {
      getListData({
        promiseResolver: resolve,
        groupId,
        initialsParts,
      });
    });
  }

  React.useEffect(() => {
    if (initialsParts && initialsParts.toString().length > 1) {
      loadMoreRows();
    }

    return () => {
      resetListData();
    };
  }, [initialsParts]);

  // return null;

  return (
    <SearchGroupProfilesCardList
      initialsParts={initialsParts}
      data={data ? data.content : []}
      totalElements={data ? data.totalElements : 0}
      pageSize={data ? data.pageSize : 0}
      isLoading={isLoading}
      loadMoreRows={loadMoreRows}
    />
  );
}

const errorChanged = createEvent<string | null>();
const $error = createStore<string | null>(null);

$error.on(errorChanged, (_, val) => val);

sample({
  source: $initialsParts,
  clock: groupProfilesCardsFetching.$list,
  fn: (initials, list) => {
    const errorMessage = 'There is no such group participant';

    if (!initials || initials.length < 2) {
      return null;
    }

    if (
      (list.status === 'initial' && !$error.getState()) ||
      (list.data && list.data.content.length > 0)
    ) {
      return null;
    }

    return errorMessage;
  },
  target: errorChanged,
});

const GroupProfilesSearchError = createStoreConsumer($error);

function SearchProfiles({ groupId }) {
  return (
    <StyledSearchProfiles>
      <div className='form-fields'>
        <Field<string>
          name='username'
          formatOnBlur
          format={(value) => {
            return typeof value === 'string' ? formatValue(value) : value;
          }}
        >
          {({ input: { value, onChange, onFocus, onBlur, name } }) => {
            return (
              <GroupProfilesSearchError>
                {(profilesSearchError) => {
                  return (
                    <Form.Group>
                      <Form.Label>Name and Surname</Form.Label>
                      <Input
                        type='text'
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          debouncedSetInitialsParts(e.target.value);
                        }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        name={name}
                        isWarn={!!profilesSearchError}
                        autoComplete='off'
                        placeholder='Enter name and surname'
                      />
                      <Form.Error fixed type='warn'>
                        {profilesSearchError}
                      </Form.Error>
                    </Form.Group>
                  );
                }}
              </GroupProfilesSearchError>
            );
          }}
        </Field>
      </div>
      <div className='group-card-list-wrapper'>
        <GroupProfilesCardList groupId={groupId} />
      </div>
    </StyledSearchProfiles>
  );
}
export function SearchGroupMessagesForm({
  onSubmit,
  initialValues,
  // minDate,
  // maxDate,
  groupId,
}: SearchGroupMessagesFormProps): ReactElement {
  React.useEffect(() => {
    if (initialValues.username) {
      debouncedSetInitialsParts(initialValues.username);
    }

    return () => {
      resetCheckedGroupProfileIds();
    };
  }, [initialValues]);

  return (
    <FinalForm<FormValues>
      subscription={{}}
      validateOnBlur
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => {
        return (
          <StyledSearchForm onSubmit={handleSubmit}>
            <AutoSave />
            <div className='form-content'>
              {/* <Scrollbars autoHide autoHideDuration={300} universal> */}
              <div className='form-fields'>
                <Field<string>
                  name='keyword'
                  formatOnBlur
                  format={(value) => {
                    return typeof value === 'string'
                      ? formatValue(value)
                      : value;
                  }}
                >
                  {({ input: { value, onChange, onFocus, onBlur, name } }) => {
                    return (
                      <Form.Group>
                        <Form.Label>Search by keyword</Form.Label>
                        <Input
                          type='text'
                          value={value}
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          name={name}
                          placeholder='Enter keyword'
                        />
                      </Form.Group>
                    );
                  }}
                </Field>
                <div className='date-wrapper'>
                  <Field<{
                    fromDate: Date | null;
                    toDate: Date | null;
                  }> name='date'>
                    {({ input: { value, onChange, onFocus, onBlur } }) => {
                      //   console.log(value);

                      //   console.log('minDate', minDate.toISOString());
                      //   console.log('maxDate', maxDate.toISOString());
                      //   console.log(
                      //     'fromDate',
                      //     value.fromDate
                      //       ? value.fromDate.toISOString().split('T')[0]
                      //       : null
                      //   );
                      //   console.log(
                      //     'toDate',
                      //     value.toDate
                      //       ? value.toDate.toISOString().split('T')[0]
                      //       : null
                      //   );

                      return (
                        <>
                          <Form.Group>
                            <Form.Label>From</Form.Label>
                            <DatePicker
                              selected={value.fromDate}
                              onChange={(date) =>
                                onChange({
                                  ...value,
                                  fromDate: date,
                                  toDate: value.toDate,
                                })
                              }
                              onFocus={onFocus}
                              onBlur={onBlur}
                              selectsStart
                              startDate={value.fromDate}
                              endDate={value.toDate}
                              minDate={value.minDate}
                              maxDate={value.toDate || value.maxDate}
                              dateFormat='MM.dd.yyyy'
                              customInput={<Input />}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>To</Form.Label>
                            <DatePicker
                              selected={value.toDate}
                              onChange={(date) =>
                                onChange({
                                  ...value,
                                  fromDate: value.fromDate,
                                  toDate: date,
                                })
                              }
                              onFocus={onFocus}
                              onBlur={onBlur}
                              selectsEnd
                              startDate={value.fromDate}
                              endDate={value.toDate}
                              minDate={value.fromDate || value.minDate}
                              maxDate={value.maxDate}
                              dateFormat='MM.dd.yyyy'
                              customInput={<Input />}
                            />
                          </Form.Group>
                        </>
                      );
                    }}
                  </Field>
                </div>
              </div>
              <SearchProfiles groupId={groupId} />
              {/* </Scrollbars> */}
            </div>
            <FormSpy
              subscription={{ submitting: true, validating: true }}
              render={({ submitting, validating }) => {
                return (
                  <Button
                    type='submit'
                    variant='primary'
                    disabled={submitting || validating}
                  >
                    SEARCH
                  </Button>
                );
              }}
            />
          </StyledSearchForm>
        );
      }}
    />
  );
}
