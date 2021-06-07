<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  import Alert from "./components/Alert.svelte";
  import Terminal from "./components/Terminal.svelte";
  import Profil from "./components/Profil.svelte";
  import VerificationStatus from "./components/VerificationStatus.svelte";
  import Limits from "./components/Limits.svelte";

  let ssoToken = {};
  let alertMessage = {};
  let userData = {};

  onMount(async () => {
    const { data } = await axios.post('http://localhost:1000/api/v1/sso-tokens');
    ssoToken = data;
  });

  const loadUserData = async () => {
    const { data } = await axios.get('http://localhost:1000/api/v1/users', {
      headers: {
        "X-USER-TOKEN": ssoToken.id,
      },
    });
    userData = data;
  };

  const ssoTokenUpdated = ({detail: { ssoToken: newSsoToken }}) => {
    ssoToken = newSsoToken;
    if (ssoToken.status === "REJECTED") {
      alertMessage = {
        title: "Oops!",
        description: "Something seems to have gone wrong with the authentication. Please try again!",
        color: "red",
      };
    } else if (ssoToken.status === "SUCCESS") {
      alertMessage = {};
      loadUserData ();
    }
  };
</script>

<div class="container mx-auto">

  {#if alertMessage.title}
    <Alert
      title={alertMessage.title}
      description={alertMessage.description}
      color={alertMessage.color}
    />
  {/if}

  {#if ssoToken.status !== "SUCCESS"}
    <Terminal
      applicationId={ssoToken.applicationId}
      ssoToken={ssoToken.token}
      tokenId={ssoToken.id}
      on:updated={ssoTokenUpdated}
    />
  {:else if userData.userId}
    <Profil userDetails={userData} />
    <VerificationStatus verificationStatus={userData.status} />
    <Limits userLimits={userData.limits} />
  {/if}

</div>