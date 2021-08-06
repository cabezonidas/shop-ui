import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Form, Label, Input, DatePicker, ProfileCard } from "..";
import { DateTime } from "luxon";
// tslint:disable: jsx-use-translation-function

storiesOf("Author", module).add("AuthorCard", () => <MyStory />);

const MyStory = () => {
  const [name, setname] = React.useState<string>("Sebastian Cabeza");
  const [dob, setdob] = React.useState<number | undefined>(new Date(1989, 4, 5).getTime());
  const [email, setemail] = React.useState("sebastian.scd@gmail.com");
  const [imageUrl, setimageUrl] = React.useState(
    "http://lorempixel.com/output/animals-q-c-500-500-9.jpg"
  );
  const [linkedin, setlinkedin] = React.useState("sebastian-cabeza-637b4731");
  const [whatsapp, setwhatsapp] = React.useState("642102790126");
  const [instagram, setinstagram] = React.useState("cabeza_sebastian");
  const [facebook, setfacebook] = React.useState("sebastian.scd");
  const [messenger, setmessenger] = React.useState("sebastian.scd");
  const [twitter, settwitter] = React.useState("cabezonidas");
  const [description, setdescription] = React.useState<string>(
    "🇳🇿🇦🇷 Software engineer 🤓 If you like this site, check it out on my Github!"
  );
  const [github, setgithub] = React.useState("cabezonidas");

  const author = React.useMemo(
    () => ({
      name,
      dob,
      email,
      imageUrl,
      linkedin,
      whatsapp,
      instagram,
      facebook,
      messenger,
      github,
      twitter,
      description: [{ localeId: "es-AR", text: description }],
    }),
    [
      name,
      dob,
      email,
      imageUrl,
      linkedin,
      whatsapp,
      instagram,
      facebook,
      description,
      github,
      twitter,
    ]
  );

  return (
    <Box display="grid" gridTemplateColumns="auto 1fr" gridGap="6">
      <Form>
        <Box>
          <Label htmlFor="name">name</Label>
          <Input id="name" value={name} onChange={e => setname(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="dob">dob</Label>
          <DatePicker
            id="dob"
            day={dob ? DateTime.fromMillis(dob) : undefined}
            onDaySelect={d => setdob(d ? d.toMillis() : undefined)}
          />
        </Box>
        <Box>
          <Label htmlFor="email">email</Label>
          <Input id="email" value={email} onChange={e => setemail(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="imageUrl">imageUrl</Label>
          <Input id="imageUrl" value={imageUrl} onChange={e => setimageUrl(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="twitter">twitter</Label>
          <Input id="twitter" value={twitter} onChange={e => settwitter(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="linkedin">linkedin</Label>
          <Input id="linkedin" value={linkedin} onChange={e => setlinkedin(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="whatsapp">whatsapp</Label>
          <Input id="whatsapp" value={whatsapp} onChange={e => setwhatsapp(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="instagram">instagram</Label>
          <Input id="instagram" value={instagram} onChange={e => setinstagram(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="facebook">facebook</Label>
          <Input id="facebook" value={facebook} onChange={e => setfacebook(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="messenger">messenger</Label>
          <Input id="messenger" value={messenger} onChange={e => setmessenger(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="github">github</Label>
          <Input id="github" value={github} onChange={e => setgithub(e.target.value)} />
        </Box>
        <Box>
          <Label htmlFor="description">description</Label>
          <Input
            id="description"
            value={description}
            onChange={e => setdescription(e.target.value)}
          />
        </Box>
      </Form>
      <ProfileCard author={author} />
    </Box>
  );
};
