import * as Tabs from '@radix-ui/react-tabs';

export default function BuilderPage() {
  return (
    <Tabs.Root className="mt-4" defaultValue="tab1">
      <Tabs.List
        aria-label="Manage your account"
        className="flex flex-wrap justify-center text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <Tabs.Trigger className="mr-2" value="tab1">
          <div className="active inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            Background
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab2">
          <div className="active inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            Clan & Predator
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab3">
          <div className="active inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            {' '}
            Attributes & Skills
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab4">
          <div className="active inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            {' '}
            Disciplines & Powers
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab5">
          <div className="active inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            {' '}
            Advantages & Flaws
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className="mr-2" value="tab6">
          <div className="active inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500">
            Touchstones & Convictions
          </div>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Chupala</Tabs.Content>
      <Tabs.Content value="tab2">World</Tabs.Content>
    </Tabs.Root>
  );
}
