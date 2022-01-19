const list = [
  { name: 'Algemene weetjes', value: 'randFact' },
  { name: 'Chuck Norris weetjes', value: 'chuckFact' },
  { name: 'Katten weetjes', value: 'catFact' },
];


/* Main Settings Page */
function renderMainPage(props) {
  let items = null;

  if (props.settings.items && JSON.parse(props.settings.items).length) {
    items = JSON.parse(props.settings.items).map((item) => (
      <Button
        key={item.id}
        label={JSON.parse(item.name).name}
        onClick={() => {
          // set default values
          props.settingsStorage.setItem('itemName', item.name);



        }}
      />
    ));
  }

  return (
    <Page>
      <Section title="Settings">
        <Text>Kies hier je categorie:</Text>
        <Select settingsKey="letter" label="Categorie" options={list} />
      </Section>


    </Page>
  );
}

registerSettingsPage((props) => {
  let result = renderMainPage;

  if (props.settings.itemAdding === 'true') result = renderEditPage;

  return result(props);
});
